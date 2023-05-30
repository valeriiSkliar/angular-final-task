import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments } from 'src/app/core/interfaces/comments';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
	selector: 'app-comment-component',
	templateUrl: './comment-component.component.html',
	styleUrls: ['./comment-component.component.css'],
})
export class CommentComponentComponent {
	comment = '';
	id = '';
	arrComments: IComments[] | undefined;
	activeComments = {
		id: '',
		comments: [
			{
				text: 'Comment',
				date: '00:00:00',
			},
		],
	};
	constructor(private activeRoute: ActivatedRoute, private listProducts: CommentService) {}

	ngOnInit() {
		this.id = this.activeRoute.snapshot.params['id'];
		this.arrComments = this.listProducts.getListComments();
		this.arrComments.forEach((element) => {
			if (element.id === this.id) {
				this.activeComments = element;
			}
		});
	}

	onClick() {
		this.activeComments.id = this.id;
		const newObj = {
			text: this.comment,
			date: new Date().toLocaleString(),
		};
		this.activeComments.comments.push(newObj);
		this.listProducts.setListComments(this.activeComments);
		this.comment = '';
		if (this.activeComments.comments[0].text === 'Comment') {
			this.activeComments.comments.shift();
		}
	}
}
